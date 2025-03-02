import QRCodeImageScanner from "./QRCodeImageScanner";
import QRCodeScanner from "./QRCodeScanner";

const Scanner = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-8 p-8">
      <div className="w-full md:w-1/2">
        <QRCodeImageScanner />
      </div>
      <div className="w-full md:w-1/2">
        <QRCodeScanner />
      </div>
    </div>
  );
};

export default Scanner;
