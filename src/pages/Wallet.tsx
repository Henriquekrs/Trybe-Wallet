import { WalletPage } from "../components/Wallet";
import { WalletForm } from "../components/WalletForm";
import { WalletTable } from "../components/WalletTable";
function Wallet() {
    return(
        <header>
            <WalletPage/>
            <WalletForm/>
            <WalletTable/>
        </header>
    )
};

export default Wallet;