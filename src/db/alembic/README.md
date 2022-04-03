1. マイグレーションスクリプトを生成
```
$ alembic revision --autogenerate -m "Initial"
```

2. データベースをマイグレーション
```
$ alembic upgrade head
```


確認コマンド

現在のレビジョンの確認
```
alembic history
```
