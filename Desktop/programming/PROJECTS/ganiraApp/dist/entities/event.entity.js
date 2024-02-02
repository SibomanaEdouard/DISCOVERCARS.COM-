"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Entity, PrimaryGeneratedColumn, Column } = require("typeorm");
require('dotenv').config();
let EventEntity = class EventEntity {
    constructor(eventName, indangamuntu, organizationLevel, location, category, description, startDate, endDate, endTime, startTime) {
        this.eventName = eventName,
            this.indangamuntu = indangamuntu,
            this.organizationLevel = organizationLevel,
            this.location = location,
            this.category = category,
            this.endDate = endDate,
            this.startDate = startDate,
            this.endTime = endTime,
            this.description = description,
            this.startTime = startTime;
    }
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], EventEntity.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], EventEntity.prototype, "eventName", void 0);
__decorate([
    Column({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], EventEntity.prototype, "indangamuntu", void 0);
__decorate([
    Column({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], EventEntity.prototype, "organizationLevel", void 0);
__decorate([
    Column({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], EventEntity.prototype, "location", void 0);
__decorate([
    Column({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], EventEntity.prototype, "category", void 0);
__decorate([
    Column({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], EventEntity.prototype, "startDate", void 0);
__decorate([
    Column({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], EventEntity.prototype, "endDate", void 0);
__decorate([
    Column({ type: "time", nullable: true }),
    __metadata("design:type", Date)
], EventEntity.prototype, "startTime", void 0);
__decorate([
    Column({ type: "time", nullable: true }),
    __metadata("design:type", Date)
], EventEntity.prototype, "endTime", void 0);
__decorate([
    Column({ type: "text", nullable: false }),
    __metadata("design:type", String)
], EventEntity.prototype, "description", void 0);
EventEntity = __decorate([
    Entity("events"),
    __metadata("design:paramtypes", [String, String, String, String, String, String, Date,
        Date,
        Date,
        Date])
], EventEntity);
exports.default = EventEntity;
