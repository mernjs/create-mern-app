import SwiftUI

class FileManagerViewModel2: ObservableObject {
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
    
    func createFile(named fileName: String, withImage image: UIImage, fileType: String) {
        guard let data = image.fileData(fileType: fileType) else { return }
        let fileURL = documentsDirectory.appendingPathComponent("\(fileName).\(fileType)")
        
        do {
            try data.write(to: fileURL)
            files.append("\(fileName).\(fileType)")
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

struct FileManagerView2: View {
    @StateObject var fileManager = FileManagerViewModel2()
    @State private var isShowingImagePicker = false
    @State private var image: UIImage?
    @State private var newFileName = ""
    @State private var selectedFileType = "png"
    
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
                ImagePicker2(image: $image)
            }
            
            Picker("File Type", selection: $selectedFileType) {
                Text("PNG").tag("png")
                Text("JPEG").tag("jpeg")
            }
            .pickerStyle(SegmentedPickerStyle())
            .padding()
            
            TextField("Enter file name", text: $newFileName)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
            
            Button("Save") {
                if let image = image {
                    fileManager.createFile(named: newFileName, withImage: image, fileType: selectedFileType)
                    newFileName = ""
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

struct ImagePicker2: UIViewControllerRepresentable {
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

extension UIImage {
    func fileData(fileType: String) -> Data? {
        switch fileType {
        case "png":
            return self.pngData()
        case "jpeg":
            return self.jpegData(compressionQuality: 1.0)
        default:
            return nil
        }
    }
}
