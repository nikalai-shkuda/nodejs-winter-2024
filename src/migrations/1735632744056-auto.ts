import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1735632744056 implements MigrationInterface {
  name = 'Auto1735632744056';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "albumId" uuid, "artistId" uuid, "name" character varying NOT NULL, "duration" integer NOT NULL, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "grammy" boolean NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artistId" uuid, "name" character varying NOT NULL, "year" integer NOT NULL, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" double precision NOT NULL, "updatedAt" double precision NOT NULL, CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_albums" ("favoritesId" uuid NOT NULL, "albumsId" uuid NOT NULL, CONSTRAINT "PK_485f265072e2f35c21a14c4a874" PRIMARY KEY ("favoritesId", "albumsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_742c8c8695facaa53dac91dcb0" ON "favorites_albums" ("favoritesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_efc778ae742551c6b1efd43deb" ON "favorites_albums" ("albumsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_artists" ("favoritesId" uuid NOT NULL, "artistsId" uuid NOT NULL, CONSTRAINT "PK_25b7d2bbf5745d06ce4ec4bc12d" PRIMARY KEY ("favoritesId", "artistsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f63a65b7c5ccd375222059b99d" ON "favorites_artists" ("favoritesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b1258cf7560cd97b330cf7e923" ON "favorites_artists" ("artistsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_tracks" ("favoritesId" uuid NOT NULL, "tracksId" uuid NOT NULL, CONSTRAINT "PK_b93682e2c5de38d0d36b916fa11" PRIMARY KEY ("favoritesId", "tracksId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b8670610383af0d4c3614607ad" ON "favorites_tracks" ("favoritesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c6f49f60cf32753d164b1d6f3b" ON "favorites_tracks" ("tracksId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_5c52e761792791f57de2fec342d" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" ADD CONSTRAINT "FK_62f595181306916265849fced48" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" ADD CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums" ADD CONSTRAINT "FK_742c8c8695facaa53dac91dcb07" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums" ADD CONSTRAINT "FK_efc778ae742551c6b1efd43debb" FOREIGN KEY ("albumsId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists" ADD CONSTRAINT "FK_f63a65b7c5ccd375222059b99d4" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists" ADD CONSTRAINT "FK_b1258cf7560cd97b330cf7e9231" FOREIGN KEY ("artistsId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks" ADD CONSTRAINT "FK_b8670610383af0d4c3614607adf" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks" ADD CONSTRAINT "FK_c6f49f60cf32753d164b1d6f3b4" FOREIGN KEY ("tracksId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks" DROP CONSTRAINT "FK_c6f49f60cf32753d164b1d6f3b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks" DROP CONSTRAINT "FK_b8670610383af0d4c3614607adf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists" DROP CONSTRAINT "FK_b1258cf7560cd97b330cf7e9231"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists" DROP CONSTRAINT "FK_f63a65b7c5ccd375222059b99d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums" DROP CONSTRAINT "FK_efc778ae742551c6b1efd43debb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums" DROP CONSTRAINT "FK_742c8c8695facaa53dac91dcb07"`,
    );
    await queryRunner.query(
      `ALTER TABLE "albums" DROP CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_62f595181306916265849fced48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracks" DROP CONSTRAINT "FK_5c52e761792791f57de2fec342d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c6f49f60cf32753d164b1d6f3b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b8670610383af0d4c3614607ad"`,
    );
    await queryRunner.query(`DROP TABLE "favorites_tracks"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b1258cf7560cd97b330cf7e923"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f63a65b7c5ccd375222059b99d"`,
    );
    await queryRunner.query(`DROP TABLE "favorites_artists"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_efc778ae742551c6b1efd43deb"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_742c8c8695facaa53dac91dcb0"`,
    );
    await queryRunner.query(`DROP TABLE "favorites_albums"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "favorites"`);
    await queryRunner.query(`DROP TABLE "albums"`);
    await queryRunner.query(`DROP TABLE "artists"`);
    await queryRunner.query(`DROP TABLE "tracks"`);
  }
}
