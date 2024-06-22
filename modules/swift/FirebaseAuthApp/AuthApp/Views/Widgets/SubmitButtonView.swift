import SwiftUI

struct SubmitButtonView: View {
    
    var title: String
    var action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack {
                Spacer()
                Text(title)
                    .foregroundColor(.white)
                Spacer()
            }
        }
        .padding()
        .background(.black)
        .cornerRadius(12)
        .padding()
    }
}

