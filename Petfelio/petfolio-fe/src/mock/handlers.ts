import { handlers as loginHandlers } from './Login';
import { handlers as logoutHandlers } from './Logout';
import { signUpHandlers } from './SignUP';
import { handlers as refreshTokenHandlers } from './RefreshToken';
import { handlers as emailVerificationHandlers } from './EmailVerification';

import { handlers as groupHandlers } from './Group';

import { handlers as myPetsHandlers } from './MyPets';
import { handlers as detailPetHandlers } from './DetailPet';
import { handlers as deletePetHandlers } from './DeletePet';
import { handlers as myPetsStikersHandlers } from './MyPetsStikers';
import { handlers as generatePetImageHandlers } from './GeneratePetImage';


import { handlers as getCardListHandlers } from './GetCardList';
import { handlers as cardHandlers } from './Card';

import { handlers as getTransactionsHandlers } from './GetTransactions';
import { handlers as getTransactionDetailHandlers } from './GetTransactionDetail';
import { handlers as saveTransactionDetailHandlers } from './SaveTransactionDetail';
import { handlers as syncTransactionHandlers } from './SyncTransaction';
import { handlers as updateTransactionDetailHandlers } from './UpdateTransactionDetail';
import { handlers as deleteTransactionDetailHandlers } from './DeleteTransactionDetail';
import { handlers as updatePetExpenseHandlers } from './UpdatePetExpense';
import { handlers as getCategoriesHandlers } from './GetCategories';

import { handlers as createConsumableHandlers } from './CreateConsumable';
import { handlers as getConsumablesHandlers } from './GetConsumables';
import { handlers as getConsumableDetailHandlers } from './GetConsumableDetail';
import { handlers as updateConsumableHandlers } from './UpdateConsumable';
import { handlers as deleteConsumableHandlers } from './DeleteConsumable';
import { handlers as getProfileHandlers } from './GetProfile';
import { handlers as getMonthlyLedgerSummaryHandlers } from './GetMonthlyLedgerSummary';
import { handlers as getDailyLedgerDetailHandlers } from './GetDailyLedgerDetail';
import { handlers as dashboardHandlers } from './Dashboard';
import { handlers as petImageHandlers } from './PetImage';
import { handlers as userProfileHandlers } from './UserProfile';

export const handlers = [

  ...loginHandlers,
  ...logoutHandlers,
  ...signUpHandlers,
  ...refreshTokenHandlers,
  ...emailVerificationHandlers,

  ...groupHandlers,

  ...myPetsHandlers,
  ...detailPetHandlers,
  ...deletePetHandlers,
  ...myPetsStikersHandlers,
  ...generatePetImageHandlers,


  ...getCardListHandlers,
  ...cardHandlers,

  ...getTransactionsHandlers,
  ...getTransactionDetailHandlers,
  ...saveTransactionDetailHandlers,
  ...syncTransactionHandlers,
  ...updateTransactionDetailHandlers,
  ...deleteTransactionDetailHandlers,
  ...updatePetExpenseHandlers,
  ...getCategoriesHandlers,

  ...createConsumableHandlers,
  ...getConsumablesHandlers,
  ...getConsumableDetailHandlers,
  ...updateConsumableHandlers,
  ...deleteConsumableHandlers,
  ...getProfileHandlers,
  ...getMonthlyLedgerSummaryHandlers,
  ...getDailyLedgerDetailHandlers,
  ...dashboardHandlers,
  ...petImageHandlers,
  ...userProfileHandlers,
];
