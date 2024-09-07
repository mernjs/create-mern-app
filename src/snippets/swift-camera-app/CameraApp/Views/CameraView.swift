import SwiftUI
import AVFoundation
import UIKit

struct CameraView: View {
    
    @StateObject var cameraController = CameraController.shared
    @ObservedObject var cameraState = CameraState.shared
    
    var body: some View {
        ZStack {
            CameraPreview()
            VStack(spacing: 0) {
                Spacer()
                if cameraState.capturedPhotoEffect {
                    BlinkingView()
                }
                BottomMenu()
            }
        }
        .onAppear {
            cameraController.requestCameraPermission()
            cameraController.requestPhotoLibraryPermission()
        }
        .statusBarHidden(true)
        .ignoresSafeArea()
        
    }
}
