-- Active: 1672382943577@@127.0.0.1@5432@postgres

INSERT INTO
    loyalty_rules (
        loyalty_tier,
        min_transaction_applied,
        loyalty_point,
        created_at,
        updated_at,
        deleted_at
    )
VALUES (1, 3, 15000, NOW(), NULL, NULL), (1, 5, 25000, NOW(), NULL, NULL), (1, 7, 35000, NOW(), NULL, NULL), (2, 3, 13500, NOW(), NULL, NULL), (2, 5, 23500, NOW(), NULL, NULL), (2, 7, 33500, NOW(), NULL, NULL), (3, 3, 13500, NOW(), NULL, NULL), (3, 5, 23500, NOW(), NULL, NULL), (3, 7, 33500, NOW(), NULL, NULL);