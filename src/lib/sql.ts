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
    try {
      this.connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'test',
        password: '',
      });
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }

  public async query(query: string, values?: any[]): Promise<QueryResult> {
    try {
      if (!this.connection) {
        await this.connect();
      }
      const [results, fields] = await this.connection!.execute(query, values);
      return { results: results as RowDataPacket[], fields };
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  public async close() {
    try {
      if (this.connection) {
        await this.connection.end();
        console.log('Database connection closed');
      }
    } catch (error) {
      console.error('Error closing the database connection:', error);
    }
  }
}

const SQL = new sql();
export default SQL;
