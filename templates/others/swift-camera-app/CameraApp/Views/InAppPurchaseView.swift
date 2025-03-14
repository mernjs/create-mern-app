import SwiftUI

struct InAppPurchaseView: View {
    @ObservedObject var controller = InAppPurchaseController()

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 10) {
                Text("Subscription Example")
                    .font(.headline)
                    .padding()

                ForEach(controller.products, id: \.productIdentifier) { product in
                    HStack {
                        VStack(alignment: .leading) {
                            Text(product.localizedTitle)
                                .padding(.horizontal)
                            Text(product.localizedDescription)
                                .padding(.horizontal)
                        }

                        Text("\(product.priceLocale.currencySymbol ?? "")\(product.price)")
                            .padding(.horizontal)

                        Spacer()

                        if controller.purchasedProductIdentifiers.contains(product.productIdentifier) {
                            Button(action: {
                                if let url = URL(string: "https://apps.apple.com/account/subscriptions") {
                                    UIApplication.shared.open(url)
                                }
                            }) {
                                Text("Manage Subscription")
                                    .padding()
                            }
                        } else {
                            Button(action: {
                                controller.purchase(product)
                            }) {
                                Text("Subscribe")
                                    .padding()
                            }
                        }
                    }
                }

                Button(action: {
                    controller.restorePurchases()
                }) {
                    Text("Restore Purchases")
                        .padding()
                }
            }
        }
    }
}
