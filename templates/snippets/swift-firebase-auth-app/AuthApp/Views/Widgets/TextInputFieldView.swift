import SwiftUI

struct TextInputFieldView: View {
    
    var placeholder: String
    @Binding var text: String
    
    var body: some View {
        TextField(placeholder, text: $text)
            .padding(16)
            .overlay(
                RoundedRectangle(cornerRadius: 6)
                    .stroke()
            )
            .padding(.horizontal, 24)
            .padding(.vertical, 12)
    }
}
