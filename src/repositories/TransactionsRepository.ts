import Transaction from '../models/Transaction';

interface CraeteTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;

    this.transactions.forEach(transaction => {
      switch (transaction.type) {
        case 'income':
          income += transaction.value;
          break;
        case 'outcome':
          outcome += transaction.value;
          break;
        default:
          break;
      }
    });

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, type, value }: CraeteTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
