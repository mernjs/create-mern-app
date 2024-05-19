import SwiftUI

class FileManagerViewModel: ObservableObject {
    @Published var files: [String] = []
    
    let fileManager = FileManager.default
    let documentsDirectory = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]
    
    func fetchImageFiles() {
        do {
            let fileURLs = try fileManager.contentsOfDirectory(at: documentsDirectory, includingPropertiesForKeys: nil)
            files = fileURLs.map { $0.lastPathComponent }
        } catch {
            print("Error fetching image files: \(error)")
        }
    }
    
    func createFile(withImage image: UIImage) {
        guard let data = image.jpegData(compressionQuality: 1.0) else { return }
//        let fileName = "\(UUID().uuidString).jpg" // Generate a unique filename
        let timestamp = Int(Date().timeIntervalSince1970)
                let fileName = "img-\(timestamp).jpg"
        let fileURL = documentsDirectory.appendingPathComponent(fileName)
        
        do {
            try data.write(to: fileURL)
            files.append(fileName)
        } catch {
            print("Error creating file: \(error)")
        }
    }
    
    func deleteFile(named fileName: String) {
        let fileURL = documentsDirectory.appendingPathComponent(fileName)
        
        do {
            try fileManager.removeItem(at: fileURL)
            if let index = files.firstIndex(of: fileName) {
                files.remove(at: index)
            }
        } catch {
            print("Error deleting file: \(error)")
        }
    }
}

struct FileManagerView: View {
    @StateObject var fileManager = FileManagerViewModel()
    @State private var isShowingImagePicker = false
    @State private var image: UIImage?
    
    var body: some View {
        VStack {
            if let image = image {
                Image(uiImage: image)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .padding()
            } else {
                Text("No Image Selected")
                    .padding()
            }
            
            Button("Select Photo") {
                isShowingImagePicker = true
            }
            .padding()
            .sheet(isPresented: $isShowingImagePicker, onDismiss: loadImage) {
                ImagePicker(image: $image)
            }
            
            Button("Save") {
                if let image = image {
                    fileManager.createFile(withImage: image)
                    self.image = nil
                }
            }
            .padding()
            
            List(fileManager.files, id: \.self) { fileName in
                HStack {
                    if let imageData = loadImageData(named: fileName),
                       let uiImage = UIImage(data: imageData) {
                        Image(uiImage: uiImage)
                            .resizable()
                            .frame(width: 50, height: 50) // Set the desired size here
                            .aspectRatio(contentMode: .fit)
                    } else {
                        Text("Error loading image")
                    }
                    Text(fileName)
                    Spacer()
                    Button("Delete") {
                        fileManager.deleteFile(named: fileName)
                    }
                    .foregroundColor(.red)
                }
            }

            .onAppear {
                fileManager.fetchImageFiles()
            }
        }
        .padding()
    }
    
    func loadImage() {
        guard let inputImage = image else { return }
        image = inputImage
    }
    
    func loadImageData(named fileName: String) -> Data? {
        let fileURL = fileManager.documentsDirectory.appendingPathComponent(fileName)
        do {
            return try Data(contentsOf: fileURL)
        } catch {
            print("Error loading image data: \(error)")
            return nil
        }
    }
}

struct ImagePicker: UIViewControllerRepresentable {
    @Binding var image: UIImage?
    @Environment(\.presentationMode) var presentationMode
    
    class Coordinator: NSObject, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
        @Binding var image: UIImage?
        @Binding var presentationMode: PresentationMode
        
        init(image: Binding<UIImage?>, presentationMode: Binding<PresentationMode>) {
            _image = image
            _presentationMode = presentationMode
        }
        
        func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
            if let uiImage = info[.originalImage] as? UIImage {
                image = uiImage
            }
            
            presentationMode.dismiss()
        }
        
        func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
            presentationMode.dismiss()
        }
    }
    
    func makeCoordinator() -> Coordinator {
        return Coordinator(image: $image, presentationMode: presentationMode)
    }
    
    func makeUIViewController(context: Context) -> UIImagePickerController {
        let picker = UIImagePickerController()
        picker.delegate = context.coordinator
        picker.sourceType = .photoLibrary
        return picker
    }
    
    func updateUIViewController(_ uiViewController: UIImagePickerController, context: Context) {}
}
