const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const { updateClientVetAtivoController } = require('../controller/clientVet'); 
const { updateClientVetAtivoModel } = require('../models/clientVet/clientVet'); 

jest.mock('../models/clientVet/clientVet'); 
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());

app.patch('/updateClientVetAtivo', updateClientVetAtivoController);

describe('updateClientVetAtivoController', () => {
    it('should update client vet ativo and return status 200', async () => {
        const mockToken = 'mockToken';
        const mockDecoded = { typeUser: 1 };
        const mockData = { Id: 1 };
        const mockUpdateResponse = { affectedRows: 1 };

        jwt.verify.mockReturnValue(mockDecoded);
        updateClientVetAtivoModel.mockResolvedValue(mockUpdateResponse);

        const response = await request(app)
            .patch('/updateClientVetAtivo')
            .set('Authorization', `Bearer ${mockToken}`)
            .send(mockData);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUpdateResponse);
    });

    it('should return 404 if no rows affected', async () => {
        const mockToken = 'mockToken';
        const mockDecoded = { typeUser: 1 };
        const mockData = { Id: 1 };
        const mockUpdateResponse = { affectedRows: 0 };

        jwt.verify.mockReturnValue(mockDecoded);
        updateClientVetAtivoModel.mockResolvedValue(mockUpdateResponse);

        const response = await request(app)
            .patch('/updateClientVetAtivo')
            .set('Authorization', `Bearer ${mockToken}`)
            .send(mockData);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Client veterinario Ativo nao atualizados' });
    });

    it('should return 400 if there is an error in the update', async () => {
        const mockToken = 'mockToken';
        const mockDecoded = { typeUser: 1 };
        const mockData = { Id: 1 };

        jwt.verify.mockReturnValue(mockDecoded);
        updateClientVetAtivoModel.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .patch('/updateClientVetAtivo')
            .set('Authorization', `Bearer ${mockToken}`)
            .send(mockData);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Error ao atualizar Client veterinario Ativo' });
    });

    it('should return 400 if token is invalid', async () => {
        const mockToken = 'invalidToken';

        jwt.verify.mockImplementation(() => {
            throw new Error('Invalid token');
        });

        const response = await request(app)
            .patch('/updateClientVetAtivo')
            .set('Authorization', `Bearer ${mockToken}`)
            .send({ Id: 1 });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Error ao atualizar Client veterinario Ativo' });
    });
});
