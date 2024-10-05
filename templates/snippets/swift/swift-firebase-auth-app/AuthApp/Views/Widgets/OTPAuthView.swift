import SwiftUI

struct OTPAuthView: View {
    
    @StateObject var authController = AuthController.shared
    
    @State private var otp: String = ""
    
    var body: some View {
        
        TextInputFieldView(placeholder: "OTP", text: $otp)
        
        SubmitButtonView(title: "Verify OTP", action: {
            authController.verifyOTPAndLogin(verificationCode: authController.verificationCode, otpCode: otp)
        })
        
    }
    
}
