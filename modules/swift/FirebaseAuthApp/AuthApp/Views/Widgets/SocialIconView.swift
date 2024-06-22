import SwiftUI

struct SocialIconView: View {
    
    var icon: String
    var action: () -> Void
    
    var body: some View {
        Button {
            action()
        } label: {
            ZStack{
                Circle()
                    .foregroundColor(.white)
                    .shadow(color: .gray, radius: 4, x: 0, y: 2)
                
                Image(icon)
                    .resizable()
                    .scaledToFit()
                    .padding(8)
                    .mask(Circle())
            }
            
        }
        .frame(width: 50, height: 50)
    }
}
