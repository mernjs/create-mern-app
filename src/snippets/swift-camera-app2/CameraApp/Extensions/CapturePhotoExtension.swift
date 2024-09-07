import Foundation
import AVFoundation
import Photos
import UIKit

extension CameraController: AVCapturePhotoCaptureDelegate {
    
    func photoOutput(_ output: AVCapturePhotoOutput, didFinishProcessingPhoto photo: AVCapturePhoto, error: Error?) {
        DispatchQueue.main.async {
            if let imageData = photo.fileDataRepresentation(), let image = UIImage(data: imageData) {
                self.cameraState.previewImage = image
                UIImageWriteToSavedPhotosAlbum(image, nil, nil, nil)
                self.cameraState.capturedPhotoEffect = false
            } else {
                print("Error: failed to saving image to photo album")
            }
        }
    }
    
    func capturePhotoAndSaveAlbum() {
        guard let photoOutputs = photoOutputs else { return }
        cameraState.capturedPhotoEffect = true
        if AVCaptureDevice.authorizationStatus(for: .video) == .authorized, captureSession.isRunning, captureSession.outputs.contains(photoOutputs) {
            let photoSettings = AVCapturePhotoSettings()
            photoOutputs.capturePhoto(with: photoSettings, delegate: self)
        } else {
            print("Error: Camera access not authorized or capture session not configured correctly")
            return
        }
    }
    
    
    
}
