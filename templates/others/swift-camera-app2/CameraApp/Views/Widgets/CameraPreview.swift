import SwiftUI
import AVFoundation


struct CameraPreview: UIViewControllerRepresentable {
    
    @StateObject var cameraController = CameraController.shared

    func makeUIViewController(context: Context) -> UIViewController {
        let viewController = UIViewController()
        cameraController.createSession()
        let previewLayer = AVCaptureVideoPreviewLayer(session: cameraController.captureSession)
        previewLayer.videoGravity = .resizeAspectFill
        previewLayer.frame = viewController.view.bounds
        viewController.view.layer.addSublayer(previewLayer)
        cameraController.startSession()
        return viewController
    }

    func updateUIViewController(_ uiViewController: UIViewController, context: Context) {}
}
