import SwiftUI

struct PhoneAuthVIew: View {
    
    @StateObject var authController = AuthController.shared
    
    @State private var phoneNumber: String = "+919838111071"
    
    var body: some View {
        
        TextInputFieldView(placeholder: "Phone Number", text: $phoneNumber)
        
        SubmitButtonView(title: "Get OTP", action: {
            authController.sendOTP(phoneNumber: phoneNumber)
        })
        
    }
    
}
