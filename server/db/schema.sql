-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS access_tokens_id_seq;

-- Table Definition
CREATE TABLE "public"."access_tokens" (
    "id" int4 NOT NULL DEFAULT nextval('access_tokens_id_seq'::regclass),
    "access_token" text,
    "user_id" int4,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS audit_history_id_seq;

-- Table Definition
CREATE TABLE "public"."audit_history" (
    "id" int4 NOT NULL DEFAULT nextval('audit_history_id_seq'::regclass),
    "order_id" int4 NOT NULL,
    "status_id" int4 NOT NULL,
    "performed_at" timestamp NOT NULL,
    "initiator_id" int4
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS kits_id_seq;

-- Table Definition
CREATE TABLE "public"."kits" (
    "id" int4 NOT NULL DEFAULT nextval('kits_id_seq'::regclass),
    "name" varchar(255),
    "product_line" int4,
    "release_date" date,
    "exclusive" varchar(255),
    "price" float8,
    "dalong_ref" varchar(255),
    "sku_code" varchar(255),
    "gpsa_link" varchar(255),
    "supplier_link" varchar(255),
    CONSTRAINT "kits_product_line_fkey" FOREIGN KEY ("product_line") REFERENCES "public"."product_lines"("id"),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS order_statuses_id_seq;

-- Table Definition
CREATE TABLE "public"."order_statuses" (
    "id" int4 NOT NULL DEFAULT nextval('order_statuses_id_seq'::regclass),
    "description" varchar(60)
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS orders_id_seq;

-- Table Definition
CREATE TABLE "public"."orders" (
    "id" int4 NOT NULL DEFAULT nextval('orders_id_seq'::regclass),
    "product_id" int2,
    "date_requested" timestamp,
    "status" int2,
    "notes" varchar(255),
    "user_id" int2,
    "date_removed" timestamp,
    CONSTRAINT "orders_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."kits"("id"),
    CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id"),
    CONSTRAINT "orders_status_fkey" FOREIGN KEY ("status") REFERENCES "public"."order_statuses"("id"),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS product_line_id_seq;

-- Table Definition
CREATE TABLE "public"."product_lines" (
    "id" int4 NOT NULL DEFAULT nextval('product_line_id_seq'::regclass),
    "product_line_name" varchar(64) NOT NULL,
    "description" text
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "discord_name" varchar(255),
    "first_name" varchar(255),
    "last_name" varchar(255),
    "discord_id" int8,
    "email" varchar(255),
    "phone_number" varchar(255),
    "password" text,
    "notes" varchar(255),
    PRIMARY KEY ("id")
);

-- SEEDS

INSERT INTO "public"."order_statuses" ("id", "description") VALUES
(1, 'Backordered'),
(2, 'Ordered'),
(3, 'In Stock'),
(4, 'Pre-Ordered'),
(5, 'Reserved'),
(6, 'Fulfilled'),
(7, 'Passed'),
(8, 'New Request'),
(9, 'Removed'),
(10, 'Wishlisted With Supplier');

INSERT INTO "public"."product_lines" ("id", "product_line_name", "description") VALUES
(1, 'HG', 'High Grade'),
(2, 'RG', 'Real Grade'),
(3, 'MG', 'Master Grade'),
(4, 'PG', 'Perfect Grade'),
(5, 'EG', 'Entry Grade'),
(6, 'SD', 'Super Deformed'),
(7, 'FM', 'Full Mechanics'),
(8, 'FG', 'First Grade'),
(9, 'MGEX', 'Master Grade Extreme'),
(10, 'HiRM', 'Hi-Resolution Model'),
(11, 'MSM', 'Mega Size Model'),
(12, 'AG', 'Advanced Grade'),
(13, 'RE/100', 'Reborn-One Hundred'),
(14, 'SG', 'Speed Grade'),
(15, 'Macross', 'Macross'),
(17, 'HY2M', 'Hyper Hybrid Model'),
(999, 'Other', 'Other');