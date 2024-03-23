import datetime
import os
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from openai import OpenAI
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app import models, schemas
from app.api import deps

router = APIRouter()


class SummaryIn(BaseModel):
    date_from: str
    date_to: str


@router.post("/")
def generate_summary(
    summary_in: SummaryIn,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve entries.
    """
    # TODO generate the summary in a celery worker

    try:
        date_from = datetime.date(*[int(x) for x in summary_in.date_from.split("-")])
        date_to = datetime.date(*[int(x) for x in summary_in.date_to.split("-")])
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format")

    entries = db.query(models.Entry).filter(
        models.Entry.owner_id == current_user.id,
        models.Entry.date >= date_from,
        models.Entry.date <= date_to,
    ).all()

    # compile the entries into a single journal
    journal = ""
    for entry in entries:
        journal += f'{entry.date}\n{entry.content}\n\n'

    print(journal)
    client = OpenAI(
        # This is the default and can be omitted
        api_key=os.environ.get("OPENAI_API_KEY"),
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": journal,
            },
            {"role": "system", "content": "You are an assistant that will receive a person journal. "
                                          "Your job is to create a short summary of all the provided journal entries."},
        ],
        model="gpt-3.5-turbo",
    )

    print(chat_completion.choices[0].message.content)

    return {"msg": "Summary generated", "summary": chat_completion.choices[0].message.content}

