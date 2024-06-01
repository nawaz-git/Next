import mysql, { Connection, RowDataPacket } from 'mysql2/promise';

interface QueryResult {
  results: RowDataPacket[];
  fields: any;
}

class sql {
  private connection: Connection | null = null;

  constructor() {
    this.connect();
  }

  private async connect() {
    this.connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'test',
      password: '',
    });
  }

  public async query(query: string, values?: any[]): Promise<QueryResult> {
    if (!this.connection) {
      await this.connect();
    }

    const [results, fields] = await this.connection!.execute(query, values);
    return { results: results as RowDataPacket[], fields };
  }

  public async close() {
    if (this.connection) {
      await this.connection.end();
    }
  }
}

const SQL = new sql();
export default SQL;
