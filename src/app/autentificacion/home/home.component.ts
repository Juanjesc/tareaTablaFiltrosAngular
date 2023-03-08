import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';

export interface UserData {
  id: number;
  nombreJuego: string;
  consola: string;
  anio: number;
  perteneceA: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'nombreJuego',
    'consola',
    'anio',
    'perteneceA',
  ];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  username: string = ''; //este username será el que se guarda en session storage
  juegos: UserData[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.dataSource = new MatTableDataSource<UserData>([]);
    //Las siguientes dos líneas en el constructor es para resolver errores de TS de los @viewChild
    this.sort = {} as MatSort;
    this.paginator = {} as MatPaginator;
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => this.pintarTabla());

    if (!this.logueado()){
      router.navigate(['/']);
    }

    // Assign the data to the data source for the table to render
  }
  logueado() {
    var logueado = false;
    if (sessionStorage.getItem('nombredeusuario')) {
      logueado = true;
      
    }
    return logueado
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('nombredeusuario') ?? ''; //esto lo que hace es que si sessionStorage es null ponga por defecto ''

    this.pintarTabla();
  }
  pintarTabla() {
    this.http
      .get<UserData[]>('http://localhost:3000/juegos')
      .subscribe((data) => {
        this.juegos = data;

        //ESTE FOR ES PARA REPETIR EL RESULTADO DE PINTAR LA TABLA 20 VECES
        var repetirArray20 = [];
        for (let i = 0; i < 20; i++) {
          for (let j = 0; j < this.filtrarTabla(this.juegos).length; j++) {
            repetirArray20.push(this.filtrarTabla(this.juegos)[j]);
          }
        }
        this.dataSource.data = repetirArray20;
      });
  }
  /* Lógica del filtro para pintar la tabla */
  filtrarTabla(juegosObjeto: UserData[]) {
    juegosObjeto = this.juegos.filter(
      (juego) => juego.perteneceA.toLowerCase() === this.username.toLowerCase()
    );
    return juegosObjeto;
  }

  /*Lógica del filtro para buscar dentro de la tabla */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  clearSesionStorage() {
    sessionStorage.removeItem('nombredeusuario') 
  }
}
