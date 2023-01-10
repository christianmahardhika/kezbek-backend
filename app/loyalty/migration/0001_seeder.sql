-- Active: 1672382943577@@127.0.0.1@5432@postgres

INSERT INTO
    loyalty (
        customer_email,
        current_tier_name,
        current_tier,
        next_tier,
        previous_tier,
        is_point_send,
        reccuring_transaction,
        created_at,
        updated_at,
        deleted_at
    )
VALUES (
        'john_doe@test.com',
        'Bronze',
        1,
        2,
        0,
        true,
        1,
        NOW(),
        NOW(),
        NULL
    );