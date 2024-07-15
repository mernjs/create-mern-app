import SwiftUI
import StoreKit

class InAppPurchaseController: NSObject, ObservableObject {
    
    @Published var products: [SKProduct] = []
    @Published var purchasedProductIdentifiers: Set<String> = []

    override init() {
        super.init()
        SKPaymentQueue.default().add(self)
        fetchProducts()
        restorePurchases()
    }

    deinit {
        SKPaymentQueue.default().remove(self)
    }

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

    func restorePurchases() {
        SKPaymentQueue.default().restoreCompletedTransactions()
    }
    
    func upgradeSubscription(to newProduct: SKProduct) {
        guard let currentProductID = purchasedProductIdentifiers.first else {
            purchase(newProduct)
            return
        }
        
        let discount = SKPaymentDiscount(identifier: "", keyIdentifier: "", nonce: UUID(), signature: "", timestamp: 0)
        let payment = SKMutablePayment(product: newProduct)
        payment.applicationUsername = currentProductID
        payment.paymentDiscount = discount
        
        SKPaymentQueue.default().add(payment)
    }
}

extension InAppPurchaseController: SKProductsRequestDelegate {
    func productsRequest(_ request: SKProductsRequest, didReceive response: SKProductsResponse) {
        DispatchQueue.main.async {
            self.products = response.products
        }
    }
}

extension InAppPurchaseController: SKPaymentTransactionObserver {
    func paymentQueue(_ queue: SKPaymentQueue, updatedTransactions transactions: [SKPaymentTransaction]) {
        for transaction in transactions {
            switch transaction.transactionState {
            case .purchased, .restored:
                DispatchQueue.main.async {
                    self.purchasedProductIdentifiers.insert(transaction.payment.productIdentifier)
                }
                SKPaymentQueue.default().finishTransaction(transaction)
            case .failed:
                SKPaymentQueue.default().finishTransaction(transaction)
            default:
                break
            }
        }
    }

    func paymentQueueRestoreCompletedTransactionsFinished(_ queue: SKPaymentQueue) {
        DispatchQueue.main.async {
            self.purchasedProductIdentifiers = Set(queue.transactions.map { $0.payment.productIdentifier })
        }
    }
}
