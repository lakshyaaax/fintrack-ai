from datetime import datetime

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models.transaction import Transaction

transactions_bp = Blueprint("transactions", __name__)


# ===========================
# GET ALL TRANSACTIONS
# ===========================
@transactions_bp.route("/", methods=["GET"])
@jwt_required()
def get_transactions():

    user_id = int(get_jwt_identity())

    transactions = (
        Transaction.query.filter_by(user_id=user_id)
        .order_by(Transaction.date.desc())
        .all()
    )

    result = []

    for transaction in transactions:
        result.append({
            "id": transaction.id,
            "amount": transaction.amount,
            "category": transaction.category,
            "description": transaction.description,
            "type": transaction.type,
            "date": transaction.date.strftime("%Y-%m-%d"),
        })

    return jsonify(result), 200


# ===========================
# ADD TRANSACTION
# ===========================
@transactions_bp.route("/", methods=["POST"])
@jwt_required()
def add_transaction():

    data = request.get_json()

    user_id = int(get_jwt_identity())

    transaction = Transaction(
        amount=data["amount"],
        category=data["category"],
        description=data["description"],
        type=data["type"],
        date=datetime.strptime(
            data["date"],
            "%Y-%m-%d"
        ).date(),
        user_id=user_id,
    )

    db.session.add(transaction)
    db.session.commit()

    return jsonify({
        "message": "Transaction added successfully"
    }), 201

@transactions_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_transaction(id):

    user_id = int(get_jwt_identity())

    transaction = Transaction.query.filter_by(
        id=id,
        user_id=user_id
    ).first()

    if not transaction:
        return jsonify({"message": "Transaction not found"}), 404

    data = request.get_json()

    transaction.amount = data["amount"]
    transaction.category = data["category"]
    transaction.type = data["type"]
    transaction.description = data.get("description", "")

    transaction.date = datetime.strptime(
        data["date"],
        "%Y-%m-%d"
    ).date()

    db.session.commit()

    return jsonify({
        "message": "Transaction updated successfully"
    }), 200

@transactions_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_transaction(id):

    user_id = int(get_jwt_identity())

    transaction = Transaction.query.filter_by(
        id=id,
        user_id=user_id
    ).first()

    if not transaction:
        return jsonify({
            "message": "Transaction not found"
        }), 404

    db.session.delete(transaction)
    db.session.commit()

    return jsonify({
        "message": "Transaction deleted successfully"
    }), 200