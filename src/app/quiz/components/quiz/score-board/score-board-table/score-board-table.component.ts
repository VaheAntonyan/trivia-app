import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ScoreRecord} from "../../../../shared/types/interfaces/score-record.interface";

@Component({
  selector: 'app-score-board-table',
  templateUrl: './score-board-table.component.html',
  styleUrls: ['./score-board-table.component.scss']
})
export class ScoreBoardTableComponent implements AfterViewInit {
  dataSource = new MatTableDataSource<ScoreRecord>(
    (JSON.parse(localStorage.getItem('quizScoreBoard') || '[]') as Array<ScoreRecord>).reverse()
  );

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
