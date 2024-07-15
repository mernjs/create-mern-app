import SwiftUI

struct ZoomSliderView: View {
    @StateObject var cameraController = CameraController.shared
    @StateObject var cameraState = CameraState.shared
    let step: CGFloat = 1.0
    
    var body: some View {
        VStack {
            Text("ZOOM: \(cameraState.currentZoom, specifier: "%.1f")")
                .padding(.top)
            Slider(
                value: $cameraState.currentZoom,
                in: 1...cameraController.captureDevice!.maxAvailableVideoZoomFactor,
                step: step
            )
                .padding(.horizontal)
                .onChange(of: cameraState.currentZoom) { newValue in
                    cameraController.onChangeZoom(scaleFactor: newValue)
                }
        }
        .background(Color.black.opacity(0.5))
        .foregroundStyle(.white)
    }
}
