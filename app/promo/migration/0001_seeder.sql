-- Active: 1672382943577@@127.0.0.1@5432@postgres

INSERT INTO
    promo (
        is_active,
        min_quantity,
        min_transaction_amount,
        max_transaction_amount,
        cashback_percentage,
        promo_start_date,
        promo_end_date,
        created_at,
        updated_at,
        deleted_at
    )
VALUES (
        gen_random_uuid(),
        true,
        1,
        0,
        100000,
        1.2,
        NOW(), (NOW() - INTERVAL '+30 DAYS'),
        NOW(),
        NULL,
        NULL
    ), (
        gen_random_uuid(),
        true,
        1,
        100000,
        500000,
        1.75,
        NOW(), (NOW() - INTERVAL '+30 DAYS'),
        NOW(),
        NULL,
        NULL
    ), (
        gen_random_uuid(),
        true,
        1,
        500000,
        1000000,
        2.3,
        NOW(), (NOW() - INTERVAL '+30 DAYS'),
        NOW(),
        NULL,
        NULL
    ), (
        gen_random_uuid(),
        true,
        2,
        500000,
        1000000,
        2.45,
        NOW(), (NOW() - INTERVAL '+30 DAYS'),
        NOW(),
        NULL,
        NULL
    ), (
        gen_random_uuid(),
        true,
        2,
        1000000,
        1500000,
        2.75,
        NOW(), (NOW() - INTERVAL '+30 DAYS'),
        NOW(),
        NULL,
        NULL
    ), (
        gen_random_uuid(),
        true,
        2,
        1500000,
        null,
        2.95,
        NOW(), (NOW() - INTERVAL '+30 DAYS'),
        NOW(),
        NULL,
        NULL
    ), (
        gen_random_uuid(),
        true,
        3,
        15000000,
        null,
        3.35,
        NOW(), (NOW() - INTERVAL '+30 DAYS'),
        NOW(),
        NULL,
        NULL
    );