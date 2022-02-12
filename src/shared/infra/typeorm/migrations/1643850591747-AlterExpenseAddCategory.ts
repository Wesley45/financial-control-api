import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AlterExpenseAddCategory1643850591747
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "expenses",
      new TableColumn({
        name: "category_id",
        type: "varchar",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "expenses",
      new TableForeignKey({
        referencedTableName: "categories",
        referencedColumnNames: ["id"],
        columnNames: ["category_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("expenses");
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("category_id") !== -1
    );
    await queryRunner.dropForeignKey(
      "expenses",
      foreignKey ? foreignKey : "category_id"
    );
    await queryRunner.dropColumn("expenses", "category_id");
  }
}
