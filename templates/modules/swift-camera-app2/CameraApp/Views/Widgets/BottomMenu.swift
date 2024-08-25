import SwiftUI

struct BottomMenu: View {
    
    @StateObject var cameraController = CameraController.shared
    @StateObject var cameraState = CameraState.shared
    
    var body: some View {
        HStack {
            Button(action: {
                cameraController.openPhotoAlbum()
            }) {
                
                if let image = cameraState.previewImage {
                    Image(uiImage: image)
                        .resizable()
                        .frame(width: 50, height: 50)
                        .clipShape(Circle())
                        .overlay(Circle().stroke(Color.white, lineWidth: 2))
                        .shadow(radius: 2)

                } else {
                    Image(systemName: "photo")
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                        .frame(width: 30, height: 30)
                        .padding(8)
                        .foregroundColor(.white)
                        .clipShape(Circle())
                        .overlay(Circle().stroke(Color.white, lineWidth: 2))
                        .shadow(radius: 2)
                }
            }
            
            Spacer()
            
            Button(action: {
                cameraController.capturePhotoAndSaveAlbum()
            }) {
                Image(systemName: "camera.circle.fill")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 65, height: 65)
                    .foregroundColor(.white)
                    .clipShape(Circle())
                    .overlay(Circle().stroke(Color.white, lineWidth: 2))
                    .shadow(radius: 2)
            }
            
            Spacer()
            
            Button(action: {
                cameraController.toggleCamera()
            }) {
                Image(systemName: "arrow.triangle.2.circlepath.camera")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 30, height: 30)
                    .padding(8)
                    .foregroundColor(.white)
                    .clipShape(Circle())
                    .overlay(Circle().stroke(Color.white, lineWidth: 2))
                    .shadow(radius: 2)
            }
            
        }
        .onAppear(){
            cameraController.fetchImagesFromRecentsAlbum()
        }
        .padding(.horizontal, 25)
        .padding(.bottom, 25)
        .background(Color.black.opacity(0.5))
    }
}
