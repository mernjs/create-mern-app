import SwiftUI
import StoreKit

class SubscriptionController: NSObject, ObservableObject {

    @Published var products: [SKProduct] = []

    func fetchProducts() {
        let productIDs: Set<String> = ["proplan", "proplanannually", "proplusplanmonthly", "proplusplanannually"]

        let request = SKProductsRequest(productIdentifiers: productIDs)
        request.delegate = self
        request.start()
    }

    func purchase(_ product: SKProduct) {
        let payment = SKPayment(product: product)
        SKPaymentQueue.default().add(payment)
    }

    func cancelSubscription(for product: SKProduct) {
        guard let transaction = SKPaymentQueue.default().transactions.first(where: { $0.payment.productIdentifier == product.productIdentifier }) else {
            print("No transaction found for product: \(product.productIdentifier)")
            return
        }

        SKPaymentQueue.default().finishTransaction(transaction)
        print("Subscription canceled for product: \(product.productIdentifier)")
    }

    func restorePurchases() {
        SKPaymentQueue.default().restoreCompletedTransactions()
    }
}

extension SubscriptionController: SKProductsRequestDelegate {
    func productsRequest(_ request: SKProductsRequest, didReceive response: SKProductsResponse) {
        DispatchQueue.main.async {
            self.products = response.products
        }
    }
}

struct SubscriptionView: View {
    @ObservedObject var controller = SubscriptionController()

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 10) {
                Text("Subscription Example")
                    .font(.headline)
                    .padding()

                ForEach(controller.products, id: \.productIdentifier) { product in

                    HStack {

                        VStack{
                            Text("\(product.localizedTitle)")
                                .padding(.horizontal)
                            Text("\(product.localizedDescription)")
                                .padding(.horizontal)
                        }

                        Text("\(product.price)")
                            .padding(.horizontal)

                        Spacer()

                        Button(action: {
                            controller.purchase(product)
                        }) {
                            Text("Subscribe")
                                .padding()
                        }

                        Button(action: {
                            controller.cancelSubscription(for: product)
                        }) {
                            Text("Cancel Subscription")
                                .padding()
                        }

                    }

                }
            }
        }
        .onAppear {
            controller.fetchProducts()
        }
    }
}
