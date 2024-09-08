import SwiftUI

struct LoginView: View {
        
    @StateObject var authController = AuthController.shared
    
    var body: some View {
        VStack {
            VStack {
                
                AuthHeaderView(title: "Sign-in", subTitle: "Welcome to back, You've \nbeen missed")
                
                if !authController.isOTP {
                    PhoneAuthVIew()
                }
                
                if authController.isOTP {
                    OTPAuthView()
                }
                
                Text("or").padding()
                
                SocialAuthView()
                
            }
            .padding(.top, 52)
            
            Spacer()
            
        }.alert(authController.isOTP ? "OTP Sent Successfully" : "Successfully Loggedin", isPresented: $authController.isSuccess) {
            Button("OK", role: .cancel) { }
        }
    }
   
}
