import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { createItem, TodoListService } from '../services/todo-list.service';

@Component({
  selector: 'app-list-manager',
  template: `
    <div class="todo-app">
      <app-input-button-unit (submit)="addItem($event)"></app-input-button-unit>

      <ul>
        <li *ngFor="let todoItem of todoList; trackBy: trackById">
          <app-todo-item
            [item]="todoItem"
            (remove)="removeItem(todoItem.id)"
            (update)="updateItem(todoItem.id, $event.changes)"></app-todo-item>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./list-manager.component.scss']
})
export class ListManagerComponent implements OnInit {
  todoList: TodoItem[] = [];

  constructor(private todoListService: TodoListService) { }

  trackById(index: number, item: TodoItem) {
    return item.id;
  }

  ngOnInit(): void {
    this.todoList = this.todoListService.getTodoList();
  }

  addItem(title: string): void {
    this.todoListService.addItem(createItem(title));
  }

  removeItem(id: number): void {
    this.todoListService.deleteItem(id);
  }

  updateItem(id, changes): void {
    this.todoListService.updateItem(id, changes);
  }

}
