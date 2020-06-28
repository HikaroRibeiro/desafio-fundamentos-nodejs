import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import transactionRouter from '../routes/transaction.routes';

interface TransactionDTO{
  title: string,
  value: number,
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title,value,type}:TransactionDTO): Transaction {

    const {total} = this.transactionsRepository.getBalance();

    if(!["outcome","income"].includes(type)){
      throw new Error(`This value ${type} is invalid!`);
    }

    if(type === 'outcome' && total < value){
      throw new Error('You do not have enough balance');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    })
    return transaction;
  }
  
}

export default CreateTransactionService;
