1. マイグレーションスクリプトを生成
```
$ alembic revision --autogenerate -m "Initial"
```

2. データベースをマイグレーション
```
$ alembic upgrade head
```

3. マイグレーションされたことを alembic に登録
```
$ alembic stamp head
```

確認コマンド

現在のレビジョンの確認
```
alembic history
```
