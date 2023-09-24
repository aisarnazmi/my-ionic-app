import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.page.html',
  styleUrls: ['./add-asset.page.scss'],
})
export class AddAssetPage implements OnInit {

  asset: any = {
    nama_aset: '',
    barcode: '',
    model: '',
    jenama: '',
    harga: 0,
    lokasi: '',
    nokppemilik: ''
  }

  imgAsset: any;

  assetId: any;
  isUpdating: boolean = false;

  constructor(
    private httpService: HttpService, 
    private router: Router, 
    private alertCtrl: AlertController,
    private route: ActivatedRoute
  ) { 
    route.paramMap.subscribe((parameter: any) => {
      this.assetId = parameter.get('id');
    });

    console.log(this.assetId);
  }

  ngOnInit() {
    if (this.assetId) {
      this.getAssetDetail();
      this.isUpdating = true;
    }
  }

  getAssetDetail() {
    this.httpService.get(`api/ifams/data/${ this.assetId }`).subscribe({
      next: (response: any) => {
        const data = response.data;

        this.asset.nama_aset = data.nama_aset;
        this.asset.barcode = data.barcode;
        this.asset.model = data.model;
        this.asset.jenama = data.jenama;
        this.asset.harga = data.harga;
        this.asset.lokasi = data.lokasi;
        this.asset.nokppemilik = data.nokppemilik;
        // OR
        // this.asset = {
        //   nama_aset: data.nama, 
        //   barcode: data.barcode, 
        //   model: data.model,
        //   jenama: data.jenama,
        //   harga: data.harga,
        //   lokasi: data.lokasi,
        //   nokppemilik: data.nokppemilik
        // }
        // OR
        // this.asset = data;
      },
      error: (error: any) => {
        console.log(error);
        
      }
    })
  }

  saveAsset() {
    console.log('New Asset Payload :', this.asset);

    let body = {
      name: this.asset.nama_aset,
      barcode: this.asset.barcode,
      model: this.asset.model,
      jenama: this.asset.jenama,
      harga: this.asset.harga,
      lokasi: this.asset.lokasi,
      nokppemilik: this.asset.nokppemilik
    }

    this.httpService.post('api/ifams/data', body).subscribe({
      next: async (response: any) => {
        console.log(response);
        
        const alert = await this.alertCtrl.create({
          header: 'Success',
          message: response.message || 'New asset successfully added.',
          buttons: [
            {
              text: 'Okay',
              handler: () => {
                this.router.navigate(['/asset-list']);
              }
            }
          ]
        });
        await alert.present();
      },
      error: (error: any) => {
        console.log(error);
        
      }
    });
  }

  saveAssetWithImage(e: any) {
    console.log('New Asset Payload :', this.asset);

    let body = new FormData();
    body.append('imej', e.target.files[0]);

    this.httpService.postMultipart('api/ifams/data', body).subscribe({
      next: async (response: any) => {
        console.log(response);
        
        const alert = await this.alertCtrl.create({
          header: 'Success',
          message: response.message || 'New asset successfully added.',
          buttons: [
            {
              text: 'Okay',
              handler: () => {
                this.router.navigate(['/asset-list']);
              }
            }
          ]
        });
        await alert.present();
      },
      error: (error: any) => {
        console.log(error);
        
      }
    });
  }

  updateAsset() {
    console.log('Update Asset Payload :', this.asset);

    let body = {
      name: this.asset.nama_aset,
      barcode: this.asset.barcode,
      model: this.asset.model,
      jenama: this.asset.jenama,
      harga: this.asset.harga,
      lokasi: this.asset.lokasi,
      nokppemilik: this.asset.nokppemilik
    }

    this.httpService.put(`api/ifams/data/${ this.assetId }`, body).subscribe({
      next: async (response: any) => {
        console.log(response);
        
        const alert = await this.alertCtrl.create({
          header: 'Success',
          message: response.message || 'Asset successfully updated.',
          buttons: [
            {
              text: 'Okay',
              handler: () => {
                this.router.navigate(['/asset-list']);
              }
            }
          ]
        });
        await alert.present();
      },
      error: (error: any) => {
        console.log(error);
        
      }
    });
  }

}
