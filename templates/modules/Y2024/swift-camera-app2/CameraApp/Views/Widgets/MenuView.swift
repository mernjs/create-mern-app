import SwiftUI

struct MenuView: View {
    @State var actions: [String] = ["PHOTO", "VIDEO", "PORTRAIT", "ZOOM", "SL-MO", "ISO", "SHUTTER", "LENS"]
    
    var body: some View {
        
        ScrollView(.horizontal, showsIndicators: false) {
            HStack {
                ForEach(actions, id: \.self) { element in
                    Button(element) {
                        debugPrint(element)
                    }
                    .padding(15)
                }
            }
            
            
            
        }
        .padding(15)
        .background(Color.black.opacity(0.5))
        .foregroundStyle(.white)
    }
    
    
}
