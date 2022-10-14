import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { Header } from "../componet/shared/header";
import { Safe } from "../componet/shared/safe";
import { Transection } from "../componet/Transection.tsx";
import { useAppContext } from "../context";
import { useId } from "../hooks/useId";

export const Transections = () => {
  const [transactions, setTransactions] = useState<any[]>([])

  const { id } = useAppContext()
  const { getPaymentRequest } = useId()

  useFocusEffect(
    useCallback(() => {
      if(id) {
        getPaymentRequest({
          payer: {
            id: id.id
          },
          executed: true
        }).then(res => setTransactions(res))
      }
    }, [])
  )
 
  return (
    <>
      <Safe>
        <Header />
        <Text
          style={{
            textAlign: "center",
            fontSize: 25,
            marginBottom: 12,
            marginTop: -20,
            fontFamily: "KronaOne_400Regular",
          }}
        >
          Transactions
        </Text>
        {transactions && transactions.map(transaction => (
          <Transection
            token={transaction.token}
            address={transaction.payee.id}
            ammount={transaction.amount}
            date={new Date(transaction.createdAt).getMonth().toString()}
            hash={transaction.transactionHash}
          />
        ))}
      </Safe>
    </>
  );
};
