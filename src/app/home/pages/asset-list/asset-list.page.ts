import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { AlertController, ViewDidEnter } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.page.html',
  styleUrls: ['./asset-list.page.scss'],
})
export class AssetListPage implements OnInit, ViewDidEnter {

  assetData: any[] = [];
  assetList: any[] = [];

  token: any;

  private topLimit: number = 25;

  constructor(
    private httpService: HttpService, 
    private router: Router, 
    private alertCtrl: AlertController,
    private storageService: StorageService
  ) { }

  async ngOnInit() {
    await this.storageService.get('authUser').then(response => {
      this.token = response.token;

      console.log(this.token);
      
    });

    this.loadAsset();
  }

  ionViewDidEnter() {    
  }

  loadAsset() {
    this.httpService.get(`api/ifams/data`).subscribe({
      next: (response: any) => {
        console.log(response.data);
        const data = response.data;

        this.assetData = data;
        this.assetList = data.slice(0, this.topLimit);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  loadMoreAsset(event: any) {
    this.topLimit += 10;
    this.assetList = this.assetData.slice(0, this.topLimit);

    // event to notify ion-infinite-scroll completed
    event.target.complete();

    // check if no more asset to be added then disable ion-infinite-scroll
    if (this.assetList.length == this.assetData.length) {
      event.target.disable = true;
    }
  }

  goToCreateAssetPage() {
    this.router.navigate(['/add-asset']);
  }

  editAsset(id: any) {
    this.router.navigate(['/add-asset', id]);
  }

  deleteAsset(id: any) {
    this.httpService.delete(`api/ifams/data/${ id }`).subscribe({
      next: async (response: any) => {
        console.log(response);
        
        const alert = await this.alertCtrl.create({
          header: 'Success',
          message: response.message || 'Asset successfully deleted.',
          buttons: [
            {
              text: 'Okay',
              handler: () => {
                this.router.navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate(['/asset-list']);
                });
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
