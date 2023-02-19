import {Component, OnInit} from '@angular/core';
import { Content } from 'helper-files/content-interface';
import {ContentTypeFilterPipe} from "src/app/type-filter.pipe";

@Component({
  selector: 'app-content-list',
  template: `
    <div class="search-container">
      <input type="text" [(ngModel)]="searchTerm" placeholder="Enter content title">
      <button (click)="searchContents(searchTerm)">Search</button>0
    </div>

    <h2>All Content</h2>
    <div class="content-list">
      <div *ngFor="let content of contents | contentTypeFilter">
        <app-content-card [content]="content" [ngClass]="content.type"></app-content-card>
      </div>
    </div>

    <h2>Filtered Content</h2>
    <div class="content-list">
      <div *ngIf="searchResults.length === 0">
        <p *ngIf="searchTerm && searchTerm.trim() !== ''">No content found with title '{{ searchTerm }}'</p>
      </div>
      <div *ngFor="let content of searchResults">
        <app-content-card [content]="content" [ngClass]="content.type"></app-content-card>
      </div>
    </div>

    <div class="content-list">
      <div *ngFor="let content of contents; let i = index" class="content-card" [style.border-width.px]="i === 0 ? 2 : 1" (click)="onImageClick(content)">
        <header>{{ content.title }}</header>
        <img [src]="content.imgURL" alt="{{ content.title }}" />
        <p>{{ content.description }}</p>
        <p>Creator: {{ content.creator }}</p>
        <p>Type: {{ content.type }}</p>
        <p>Tags: {{ content.tags ? content.tags.join(', ') : '' }}</p>
      </div>
    </div>

  `,
  styleUrls: ['/content-list.component.css']
})
export class ContentListComponent implements OnInit{
  contents: Content[] = [
    {
      id: 1,
      title: 'World Of Warcraft',
      imgURL: 'https://imgs.search.brave.com/Y3YbqvbpF5Gp0EVzd3T-COnb7xy7xn2qobB73PvLqD0/rs:fit:150:150:1/g:ce/aHR0cHM6Ly9naWYt/YXZhdGFycy5jb20v/aW1nLzE1MHgxNTAv/d29ybGQtb2Ytd2Fy/Y3JhZnQuZ2lm.gif',
      description: '(WoW) is a massively multiplayer online role-playing game (MMORPG) released in 2004 by Blizzard Entertainment',
      creator: 'William Petras,\n' +
        'Kevin Beardslee,\n' +
        'Justin Thavirat',
      type: 'type1',
      tags: ['Open World', 'Quests', 'PvP']
    },
    {
      id: 2,
      title: 'Sackboy',
      imgURL: 'https://imgs.search.brave.com/9oDzNucrY50vhcA5d1RpOF9x6vnGHiNhVnTCCsFcL3A/rs:fit:150:150:1/g:ce/aHR0cHM6Ly9hdmF0/YXJmaWxlcy5hbHBo/YWNvZGVycy5jb20v/MTQ4LzE0ODMuanBn',
      description: 'A Big Adventure is a 2020 platform game developed by Sumo Digital and published by Sony Interactive Entertainment',
      creator: 'Sony Interactive Entertainment',
      type: 'type2',
      tags: ['Objectives', 'PvE']
    },
    {
      id: 3,
      title: 'Apex Legends',
      imgURL: 'https://imgs.search.brave.com/i1b2uZIjQaEKWDf-87ke3aU89MxuRsDk0GIhX1B8Srg/rs:fit:150:150:1/g:ce/aHR0cHM6Ly9hdmF0/YXJmaWxlcy5hbHBo/YWNvZGVycy5jb20v/MjgxL3RodW1iLTI4/MTQyOC5wbmc',
      description: 'free-to-play battle royale-hero shooter game developed by Respawn Entertainment and published by Electronic',
      creator: 'Respawn Entertainment',
      type: 'type3',
      tags: ['FPP', 'Action']
    },
    {
      id: 4,
      title: 'Call of Duty: Modern Warfare II',
      imgURL: 'https://imgs.search.brave.com/jT9SSjKgP6tZr1Ak-XCq9FsdwIGASRMVMzEEpa-C4nU/rs:fit:200:200:1/g:ce/aHR0cHM6Ly9hdmF0/YXJmaWxlcy5hbHBo/YWNvZGVycy5jb20v/MTQxL3RodW1iLTE0/MTkyMy5qcGc',
      description: 'Call of Duty: Modern Warfare II is a 2022 first-person shooter game developed by Infinity Ward and published by Activision.',
      creator: 'Infinity Ward',
      type: 'type1',
      tags: ['FPP', 'PvP']
    },
    {
      id: 5,
      title: 'Raft',
      imgURL: 'https://i.imgur.com/PQi4gml.png',
      description: 'Raft is an open world survival video game developed by Swedish developer Redbeet Interactive, and published by Axolot Games.',
      creator: 'Redbeet Interactive',
      type: 'type3',
      tags: ['Survival', 'Open World']
    },
    {
      id: 6,
      title: 'The Last of Us',
      imgURL: 'https://imgs.search.brave.com/ScQe75cCy0QBgPP58NYyOTSWb0Z9VW3gAGcOmt8-CGM/rs:fit:184:184:1/g:ce/aHR0cHM6Ly9hdmF0/YXJmaWxlcy5hbHBo/YWNvZGVycy5jb20v/MTA5LzEwOTE3My5w/bmc',
      description: 'The Last of Us is a 2013 action-adventure game developed by Naughty Dog and published by Sony Computer Entertainment.',
      creator: 'Naughty Dog',
      type: 'type2',
      tags: ['PvE', 'Combat']
    },
    {
      id: 7,
      title: 'Hearthstone',
      imgURL: 'https://imgs.search.brave.com/O6Mif3PMt6K5tFXrmtkUraZhB-csvKqKgUKPq9ahFmE/rs:fit:150:150:1/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFlL2M3/Lzk4LzFlYzc5ODk1/NGY2NjViZWMzMzc4/YjE2OGNiNTM4NGE5/LmpwZw',
      description: 'THearthstone is a free-to-play online digital collectible card game developed and published by Blizzard Entertainment.',
      creator: 'Blizzard Entertainment',
      type: 'type1',
      tags: ['Card Game', 'Abilities']
    }
  ];

  filteredContents: Content[] = [];


  ngOnInit() {
  }


  filterContents(type: string) {
    this.filteredContents = this.contents.filter(content => {
      if (type) {
        return content.type === type;
      } else {
        return true;
      }
    });
  }

  searchResults: Content[] = [];
  searchTerm = '';

  searchContents(searchTerm: string) {
    searchTerm = searchTerm.toLowerCase();
    this.filteredContents = this.contents.filter(content =>
      content.title.toLowerCase().includes(searchTerm) || content.description.toLowerCase().includes(searchTerm)
    );
  }

  onImageClick(content: Content) {
    console.log(`Clicked on content ${content.id}: ${content.title}`);
  }

}

