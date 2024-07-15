//import SwiftUI
//import AVFoundation
//
//struct CameraPreview: UIViewControllerRepresentable {
//    @StateObject var cameraController = CameraController.shared
//
//    func makeUIViewController(context: Context) -> UIViewController {
//        let viewController = UIViewController()
//        cameraController.configureSession()
//        let previewLayer = AVCaptureVideoPreviewLayer(session: cameraController.captureSession)
//        previewLayer.videoGravity = .resizeAspectFill
//        previewLayer.frame = viewController.view.bounds
//        viewController.view.layer.addSublayer(previewLayer)
//        cameraController.startSession()
//
//        // Add tap gesture recognizer
//        let tapGesture = UITapGestureRecognizer(target: context.coordinator, action: #selector(Coordinator.didTap(_:)))
//        viewController.view.addGestureRecognizer(tapGesture)
//
//        return viewController
//    }
//
//    func updateUIViewController(_ uiViewController: UIViewController, context: Context) {}
//
//    func makeCoordinator() -> Coordinator {
//        Coordinator(cameraController: cameraController)
//    }
//
//    class Coordinator: NSObject {
//        let cameraController: CameraController
//
//        init(cameraController: CameraController) {
//            self.cameraController = cameraController
//        }
//
//        @objc func didTap(_ gesture: UITapGestureRecognizer) {
//            if gesture.state == .ended {
//                cameraController.capturePhotoAndSaveAlbum()
//            }
//        }
//    }
//}

import Foundation
import AVFoundation
import Photos
import UIKit
import AVKit
import SwiftUI

struct CameraPreview: UIViewControllerRepresentable {
    @StateObject var cameraController = CameraController.shared
    
    func makeUIViewController(context: Context) -> UIViewController {
        let viewController = UIViewController()
        cameraController.configureSession()
        let previewLayer = AVCaptureVideoPreviewLayer(session: cameraController.captureSession)
        previewLayer.videoGravity = .resizeAspectFill
        previewLayer.frame = viewController.view.bounds
        viewController.view.layer.addSublayer(previewLayer)
        cameraController.startSession()
        
        // Add volume button press monitoring
        NotificationCenter.default.addObserver(forName: UIAccessibility.announcementDidFinishNotification, object: nil, queue: nil) { notification in
            cameraController.capturePhotoAndSaveAlbum()
        }
        
        return viewController
    }
    
    func updateUIViewController(_ uiViewController: UIViewController, context: Context) {}
}
