from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.schema import Column, ForeignKey, Sequence
from sqlalchemy.types import Integer, String, Text, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

db = SQLAlchemy()

class Notebook(db.Model):
    __tablename__ = "notebooks"

    id = Column(Integer, primary_key=True)
    userId = Column(Integer, db.ForeignKey("users.id"), nullable=False)
    title = Column(String(30), default="Untitled", nullable=False)

    user = relationship("User", back_populates="notebooks")
    pages = relationship("Page", back_populates="notebook", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "title": self.title
        }

class Page(db.Model):
    __tablename__ = "pages"

    id = Column(Integer, primary_key=True)
    userId = Column(Integer, ForeignKey("users.id"), nullable=False)
    notebookId = Column(Integer, ForeignKey("notebooks.id"), nullable=False)
    title = Column(String(30), default="New Page", nullable=True)
    content = Column(Text, default="", nullable=True)
    trashed = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), nullable=True, server_default= func.now())
    updated_at = Column(DateTime(timezone=True), nullable=True, server_default= func.now(), onupdate=func.now())
    # created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    # updated_at = db.Column(db.DateTime, nullable=True, default=datetime.now(), onupdate=datetime.now)

    user = relationship("User", back_populates="pages")
    notebook = relationship("Notebook", back_populates="pages")


    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "notebookId": self.notebookId,
            "title": self.title,
            "content": self.content,
            "trashed": self.trashed,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }


class Scratch(db.Model):
    __tablename__ = "scratches"

    id = Column(Integer, primary_key=True)
    userId = Column(Integer, ForeignKey("users.id"), nullable=False)
    content = Column(Text, nullable=True)

    user = relationship("User", back_populates="scratch")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "content": self.content
        }
