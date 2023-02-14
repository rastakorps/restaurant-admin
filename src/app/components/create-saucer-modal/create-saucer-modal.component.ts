import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController, Platform } from '@ionic/angular';
import { RestaurantRestService } from '../../services/restaurant-rest.service';
import { Saucer } from '../../interfaces/index';

import { Filesystem, Directory } from '@capacitor/filesystem';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

const IMAGE_DIR = 'stored-images';

interface LocalFile {
	name: string;
	path: string;
	data: string;
}

@Component({
  selector: 'app-create-saucer-modal',
  templateUrl: './create-saucer-modal.component.html',
  styleUrls: ['./create-saucer-modal.component.scss'],
})
export class CreateSaucerModalComponent implements OnInit {

  name:string;
  description:string;
  price: number;
  image: any;
  images: LocalFile[] = [];

  constructor(
    private plt: Platform,
    private modalCtr: ModalController,
    private restaurantRestService: RestaurantRestService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    ) { }

  async ngOnInit() {
    this.loadFiles();
  }

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

  createSaucer() {
    const loading = this.presentLoading();
    const message = "Se ha creado el platillo";
    const promise = new Promise((resolve, reject) => {
    let imageToSend: any;  
    let data: Saucer = {
      name: this.name,
      description: this.description,
      price: this.price,
      imageSaucer: this.image ? this.image : null
    } 
    
    this.restaurantRestService.addSaucer(data)
      .subscribe((response) => {
        loading.then(() => { this.loadingController.dismiss();});
        this.presentToast(message);
        this.close();
      },
      (error) => {
        loading.then(() => { this.loadingController.dismiss(); });
      }); 
    });
    return promise;
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    return await loading.present();
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async loadFiles() {
		this.images = [];

		const loading = this.presentLoading();

		Filesystem.readdir({
			path: IMAGE_DIR,
			directory: Directory.Data
		})
			.then(
				(result) => {
					//this.loadFileData(result.files);
				},
				async (err) => {
					// Folder does not yet exists!
					await Filesystem.mkdir({
						path: IMAGE_DIR,
						directory: Directory.Data
					});
				}
			)
			.then((_) => {
				loading.then(() => { this.loadingController.dismiss(); });
			});
	}

  async loadFileData(fileNames: string[]) {
		for (let f of fileNames) {
			const filePath = `${IMAGE_DIR}/${f}`;

			const readFile = await Filesystem.readFile({
				path: filePath,
				directory: Directory.Data
			});

			this.images.push({
				name: f,
				path: filePath,
				data: `data:image/jpeg;base64,${readFile.data}`
			});
		}
	}

  async selectImage() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos // Camera, Photos or Prompt!
    });

    if(image) {
      this.saveImage(image)
      .then((response) => {
        this.image = response;
      })
      .catch((error) => {
        console.error(`No se pudo cargar la imagen: ${error}`);
      });
    }
  }

  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    const response = await fetch(base64Data);
    let extension = response.url.split(';')[0].split('/')[1]
    let data = {
      imageBase64: response.url,
      extension: extension
    }
    return data;
    //this.uploadData(data);
  }

  async uploadData(data: any) {
    /*const loading = await this.loadingCtrl.create({
        message: 'Uploading image...',
    });
    await loading.present();

    // Use your own API!
    const url = 'http://localhost:8888/images/upload.php';

    this.http.post(url, formData)
        .pipe(
            finalize(() => {
                loading.dismiss();
            })
        )
        .subscribe(res => {
            if (res['success']) {
                this.presentToast('File upload complete.')
            } else {
                this.presentToast('File upload failed.')
            }
        });*/

    
        const loading = this.presentLoading();
        const message = "Correcto";
        const promise = new Promise((resolve, reject) => {
            /*let data: Saucer;
                  data = {
                    name: this.name,
                    description: this.description,
                    price: this.price
                  } */
             
            this.restaurantRestService.addImage(data)
                      .subscribe((response) => {
                        loading.then(() => { this.loadingController.dismiss();});
                        this.presentToast(message);
                        console.log(response)
                      },
                      (error) => {
                        loading.then(() => { this.loadingController.dismiss(); });
                      }); 
        });
        return promise;
  }

  // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
        const file = await Filesystem.readFile({
            path: photo.path
        });

        return file.data;
    }
    else {
        // Fetch the photo, read as a blob, then convert to base64 format
        const response = await fetch(photo.webPath);
        const blob = await response.blob();

        return await this.convertBlobToBase64(blob) as string;
    }
  }

  // Helper function
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}
