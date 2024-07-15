import SwiftUI
import Firebase
import FirebaseAuth
import GoogleSignIn
import FBSDKLoginKit
import AuthenticationServices
import CryptoKit

class AuthController: NSObject, ObservableObject {
    
    static let shared = AuthController()
    
    @Published public var verificationCode: String = ""
    @Published public var isOTP: Bool = false
    @Published public var isSuccess: Bool = false
    
    public var currentNonce: String?
    
    private override init() { super.init() }
    
    public func sendOTP(phoneNumber: String) {
        PhoneAuthProvider.provider()
            .verifyPhoneNumber(phoneNumber, uiDelegate: nil) { verificationID, error in
                if let error = error {
                    print("Failed to send verification code: \(error.localizedDescription)")
                    return
                }
                self.isOTP = true
                self.isSuccess = true
                print("SENT OTP")
            }
    }
    
    public func verifyOTPAndLogin(verificationCode: String, otpCode: String) {
        
        let credential = PhoneAuthProvider.provider().credential(
            withVerificationID: verificationCode,
            verificationCode: otpCode
        )
        
        Auth.auth().signIn(with: credential) { authResult, error in
            if let error = error {
                print("Authentication error: \(error.localizedDescription)")
                return
            }
    
            guard (authResult?.user) != nil else {
                print("Failed to retrieve authenticated user.")
                return
            }
            self.isOTP = false
            self.isSuccess = true
            print("SIGN IN")
        }
    }
    
    public func signinWithGoogle(presenting: UIViewController) {
        
        guard let clientID = FirebaseApp.app()?.options.clientID else { return }
        
        let config = GIDConfiguration(clientID: clientID)
        
        GIDSignIn.sharedInstance.configuration = config
        
        GIDSignIn.sharedInstance.signIn(withPresenting: presenting) { result, error in
            
            if let error = error {
                print("Error: \(error.localizedDescription)")
                return
            }
            
            guard let user = result?.user, let idToken = user.idToken?.tokenString else {
                print("Failed to retrieve authentication or idToken")
                return
            }
            
            let credential = GoogleAuthProvider.credential(withIDToken: idToken, accessToken: user.accessToken.tokenString)
            
            Auth.auth().signIn(with: credential) { result, error in
                if let error = error {
                    print("Error: \(error.localizedDescription)")
                    return
                }
                self.isSuccess = true
                print("SIGN IN")
            }
        }
    }
    
    public func signInWithFacebook(presenting: UIViewController) {
        
        let loginManager = LoginManager()
        
        loginManager.logIn(permissions: ["public_profile"], from: presenting) { result, error in
           
            if let error = error {
                print("Error: \(error.localizedDescription)")
                return
            }
            
            guard let accessToken = AccessToken.current else {
                print("Failed to get access token")
                return
            }
            
            let credential = FacebookAuthProvider.credential(withAccessToken: accessToken.tokenString)
            
            Auth.auth().signIn(with: credential) { authResult, error in
                if let error = error {
                    print("Error: \(error.localizedDescription)")
                    return
                }
                self.isSuccess = true
                print("SIGN IN")
            }
        }
    }
    
    public func signInWithApple(presenting: UIViewController) {
        let nonce = randomNonceString()
        currentNonce = nonce
        let request = ASAuthorizationAppleIDProvider().createRequest()
        request.requestedScopes = [.fullName, .email]
        request.nonce = sha256(nonce)
        
        let authorizationController = ASAuthorizationController(authorizationRequests: [request])
        authorizationController.delegate = self
        authorizationController.presentationContextProvider = self
        authorizationController.performRequests()
    }
    
    private func randomNonceString(length: Int = 32) -> String {
        precondition(length > 0)
        let charset: Array<Character> =
            Array("0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._")
        var result = ""
        var remainingLength = length
        
        while remainingLength > 0 {
            let randoms: [UInt8] = (0 ..< 16).map { _ in
                var random: UInt8 = 0
                let errorCode = SecRandomCopyBytes(kSecRandomDefault, 1, &random)
                if errorCode != errSecSuccess {
                    fatalError("Unable to generate nonce. SecRandomCopyBytes failed with OSStatus \(errorCode)")
                }
                return random
            }
            
            randoms.forEach { random in
                if remainingLength == 0 {
                    return
                }
                
                if random < charset.count {
                    result.append(charset[Int(random)])
                    remainingLength -= 1
                }
            }
        }
        
        return result
    }

    private func sha256(_ input: String) -> String {
        let inputData = Data(input.utf8)
        let hashedData = SHA256.hash(data: inputData)
        let hashString = hashedData.compactMap {
            String(format: "%02x", $0)
        }.joined()

        return hashString
    }

    
}

