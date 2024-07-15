import Foundation
import UIKit

class CameraState: ObservableObject {
    
    static let shared = CameraState()
    
    private init() {}
    
    @Published var currentZoom: CGFloat = 1
    @Published var images: [UIImage]? = []
    @Published var previewImage: UIImage? = nil
    @Published var capturedPhotoEffect: Bool = false
        
}
