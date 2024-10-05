import SwiftUI

struct AuthHeaderView: View {
    
    var title: String
    var subTitle: String
    
    var body: some View {
        VStack {
            Text(title)
                .font(.largeTitle)
                .fontWeight(.medium)
                .padding()
            
            Text(subTitle)
                .multilineTextAlignment(.center)
        }.padding(.bottom)
    }
}
