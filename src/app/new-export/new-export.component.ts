import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver/FileSaver';
import { AlertService, UserService } from '../_services/index';
import { Export, Format, Expenses} from '../_models/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/router/src/config';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'app-new-export',
    templateUrl: './new-export.component.html',
    styleUrls: ['./new-export.component.scss']
})
export class NewexoprtComponent implements OnChanges {
    Export: Array<Expenses> = [];
    csvmodel: any= [];
    csvlist: Export[] = [] ;
    Order: Array<Format>;
    defaultcsv: Export[]= [];
    defaultcsv2: Export[]= [];
    listfomule: Array<Format>;
    name = 'New Export Format';
    format = 'csv';
    show: boolean = false;
    showtext: boolean = false;

    constructor(
        private userService: UserService,
        private alertService: AlertService,
        private router: Router
    ) {
        this.Export = JSON.parse(localStorage.getItem('Expenses'));
        this.defaultcsv = JSON.parse(localStorage.getItem('CSVdefault'));
        this.defaultcsv2 = JSON.parse(localStorage.getItem('CSVdefault'));
        this.Order = this.defaultcsv[0].order;
        this.listfomule = this.defaultcsv2[0].order;

    }
    register() {
        this.show = false;
        this.showtext = false;
        /*list? */
        this.csvmodel = JSON.parse(localStorage.getItem('list')) || [];

/*user , duplicatescv*/
        let duplicatescv = this.csvmodel.filter(user => { return user.name === this.name}).length;
        if (duplicatescv) {
            this.showtext = true;

        }
        else {
            console.log('enregister');
            this.csvmodel.push({
                id: this.csvlist.length,
                format: this.format,
                order: this.Order,
                name: this.name});
            localStorage.setItem('list', JSON.stringify(this.csvmodel));
            this.Order = this.defaultcsv2[0].order;
            this.show = true;
            this.showtext = false;
        }

    }
    chengeSelect(i) {
         console.log(i);
    }
    ngOnChanges() {
        this.listfomule = this.defaultcsv2[0].order;
    }
    getlist() {
        this.Order.push(
            {
                formule: '',
                entet: 'Column ' + (this.Order.length + 1)
            }
        );

    }
    getCaracter(i) {
        return String.fromCharCode(65 + i);
    }

    dataChanged($event) {

        console.log('is token');
        this.csvmodel = JSON.parse(localStorage.getItem('list')) || [];


        let duplicatescv = this.csvmodel.filter(user => { return user.name === this.name}).length;
        if (duplicatescv) {
           console.log('is token');
           this.showtext = true;

        }
        else
        { this.showtext = false ;
        }
    }
    getvalue(Ex: number, item) {
        let Entry= this.Export[Ex] ;
                  let x = this.Order[item].formule;
                    switch (x) {
                        case x = 'date_depence':
                            return Entry.date_depence ;
                        case x = 'Nom':
                            return Entry.Nom ;
                        case x = 'Categorie':
                             return Entry.Categorie ;
                        case x = 'value':
                             return Entry.value  ;
                        case x = 'TVA':
                            return Entry.TVA ;
                        case x = 'moyen_payement':
                            return Entry.moyen_payement ;
                        case x = 'Nom_marchand':
                            return Entry.Nom_marchand  ;
                        case x = 'pays':
                            return Entry.pays  ;
                        case x = 'id':
                            return Entry.id ;
                        case x = 'Affaire':
                            return Entry.Affaire ;
                       default:
                            return '';

                    }
    }
    deletelist(i) {
    this.Order.splice(i, 1) ;
    }
}

