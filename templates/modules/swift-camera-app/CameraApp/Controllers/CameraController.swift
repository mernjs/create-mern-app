import Foundation
import AVFoundation
import Photos
import UIKit
import AVKit

class CameraController: NSObject, ObservableObject {
    
    @Published var cameraState = CameraState.shared
    
    static let shared = CameraController()
    
    var captureDevice: AVCaptureDevice?
    var captureSession: AVCaptureSession
    var photoOutputs: AVCapturePhotoOutput?
//    var eventInteraction: AVCaptureEventInteraction?
    
    let frontCamera = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .front)
    let backCamera = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .back)
    

   
    private override init() {
        self.captureDevice = backCamera
        self.captureSession = AVCaptureSession()
        super.init()
    }
    
//    func configureHardwareInteraction() {
//        let interaction = AVCaptureEventInteraction { [weak self] event in
//            print("DDDD")
//            if event.phase == .ended {
//                self?.capturePhotoAndSaveAlbum()
//            }
//        }
//        captureSession.addInteraction(interaction)
//        eventInteraction = interaction
//    }
//    
//    deinit {
//        if let eventInteraction = eventInteraction {
//            captureSession.removeInteraction(eventInteraction)
//        }
//    }
//    
//    func createSession() {
//        guard let captureDevice = self.captureDevice else { return }
//        do {
//            let input = try AVCaptureDeviceInput(device: captureDevice)
//            self.captureSession.addInput(input)
//            
//            // Add photo output
//            photoOutputs = AVCapturePhotoOutput()
//            if captureSession.canAddOutput(photoOutputs!) {
//                captureSession.addOutput(photoOutputs!)
//                print("Photo output added to capture session")
//            } else {
//                print("Error: Failed to add photo output to capture session")
//            }
//            
//                    configureHardwareInteraction()
//            
//        } catch {
//            print("Error: Failed to create AVCaptureDeviceInput - \(error)")
//        }
//    }
    
    func configureSession() {
            guard let captureDevice = self.captureDevice else { return }
            do {
                let input = try AVCaptureDeviceInput(device: captureDevice)
                self.captureSession.addInput(input)

                // Add photo output
                photoOutputs = AVCapturePhotoOutput()
                if let photoOutput = photoOutputs, captureSession.canAddOutput(photoOutput) {
                    captureSession.addOutput(photoOutput)
                    print("Photo output added to capture session")
                } else {
                    print("Error: Failed to add photo output to capture session")
                }
            } catch {
                print("Error: Failed to create AVCaptureDeviceInput - \(error)")
            }
        }

    
    func startSession() {
        DispatchQueue.global().async {
            self.captureSession.startRunning()
        }
    }
    
    func stopSession() {
        captureSession.stopRunning()
    }
    
    func requestCameraPermission(callback: ((Bool) -> Void)? = nil) {
        AVCaptureDevice.requestAccess(for: .video) { granted in
            callback?(granted)
        }
    }
    
    func toggleCamera() {
        guard let currentInput = captureSession.inputs.first as? AVCaptureDeviceInput else {
            print("Error: No current input")
            return
        }
        
        do {
            captureSession.beginConfiguration()
            
            var newCamera: AVCaptureDevice?
            
            if currentInput.device.position == .front {
                newCamera = backCamera
            } else {
                newCamera = frontCamera
            }
            
            let newInput = try AVCaptureDeviceInput(device: newCamera!)
            
            // Remove the current input
            captureSession.removeInput(currentInput)
            
            // Add the new input
            if captureSession.canAddInput(newInput) {
                captureSession.addInput(newInput)
                captureDevice = newCamera
            } else {
                print("Error: Failed to add new input")
            }
            
            captureSession.commitConfiguration()
        } catch {
            print("Error: Failed to toggle camera - \(error)")
        }
    }

    
    func onChangeZoom(scaleFactor: CGFloat) {
        guard let device = captureDevice else { return }
        do {
            try device.lockForConfiguration()
            if device.activeFormat.videoMaxZoomFactor > 1.0 {
                device.videoZoomFactor = max(1.0, min(scaleFactor, device.activeFormat.videoMaxZoomFactor))
            } else {
                print("Error: Zoom is not available for this device")
            }
            device.unlockForConfiguration()
        } catch {
            print("Error: Failed to set videoZoomFactor - \(error)")
        }
    }
    
    func requestPhotoLibraryPermission(callback: ((Bool) -> Void)? = nil) {
        PHPhotoLibrary.requestAuthorization { status in
            DispatchQueue.main.async {
                callback?(status == .authorized)
            }
        }
    }
    
    func createAlbum(albumName: String, completion: @escaping (Bool, Error?) -> Void) {
        PHPhotoLibrary.shared().performChanges({
            PHAssetCollectionChangeRequest.creationRequestForAssetCollection(withTitle: albumName)
        }) { success, error in
            completion(success, error)
        }
    }

    
    func openPhotoAlbum() {
        guard let url = URL(string: "photos-redirect://") else {
            print("Error: Unable to create URL for opening photo album")
            return
        }
        
        if UIApplication.shared.canOpenURL(url) {
            UIApplication.shared.open(url, options: [:], completionHandler: nil)
        } else {
            print("Error: Unable to open photo album")
        }
    }
    
    func fetchImagesFromRecentsAlbum() {
        
        let fetchOptions = PHFetchOptions()
        
        fetchOptions.sortDescriptors = [NSSortDescriptor(key: "creationDate", ascending: false)]
        
        let fetchResult = PHAsset.fetchAssets(with: .image, options: fetchOptions)
        
        cameraState.images?.removeAll()
        
        fetchResult.enumerateObjects { (asset, _, _) in
            let options = PHImageRequestOptions()
            options.isSynchronous = true
            options.deliveryMode = .highQualityFormat
            
            PHImageManager.default().requestImage(for: asset, targetSize: PHImageManagerMaximumSize, contentMode: .aspectFit, options: options) { (image, _) in
                if let image = image {
                    self.cameraState.images?.append(image)
                }
            }
        }
        
        if let firstImage = self.cameraState.images?.first {
            cameraState.previewImage = firstImage
        }
        
    }
    
    
}
