import { getToken } from "fetcch-chain-data";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Request } from "../componet/request";
import { Header } from "../componet/shared/header";
import { Safe } from "../componet/shared/safe";
import { useId } from "../hooks/useId";

export const Requests = ({ navigation }: any) => {
	const [requests, setRequests] = useState<any>([]);

	const { getPaymentRequest } = useId();

	useEffect(() => {
		getPaymentRequest().then((res) => {
			if (res.length > 0) {
				const l = res.map((r: any) => {
					const token = getToken(
						r.token,
						r.chain.id == "9" ? "2" : r.chain.id
					);
					return {
						...r,
						token,
					};
				});
				setRequests(l);
			}
		});
	}, []);

	useEffect(() => console.log(requests, "D"), [requests]);

	return (
		<ScrollView>
			<Safe>
				<Header />
				<Text
					style={{
						fontSize: 22,
						textAlign: "center",
						marginBottom: 22,
						fontFamily: "KronaOne_400Regular",
					}}
				>
					Payment Requests
				</Text>
				<View
					style={{
						width: "100%",
						flex: 1,
						alignItems: "center",
					}}
				>
					{requests.map((request: any) => (
						<Request navigation={navigation} request={request} />
					))}
				</View>
			</Safe>
		</ScrollView>
	);
};
