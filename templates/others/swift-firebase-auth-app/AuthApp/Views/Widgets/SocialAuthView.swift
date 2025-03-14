import SwiftUI

struct SocialAuthView: View {
    
    @StateObject var authController = AuthController.shared
    
    var body: some View {
        HStack{
            Spacer()
            SocialIconView(
                icon: "google",
                action: {
                    authController.signinWithGoogle(presenting: getRootViewController())
                }
            )
            Spacer()
            SocialIconView(
                icon: "facebook",
                action: {
                    authController.signInWithFacebook(presenting: getRootViewController())
                }
            )
            Spacer()
            SocialIconView(
                icon: "apple",
                action: {
                    authController.signInWithApple(presenting: getRootViewController())
                }
            )
            Spacer()
        }
        
    }
}
